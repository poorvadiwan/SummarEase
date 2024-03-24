import os
from concurrent.futures import ThreadPoolExecutor
from icrawler.builtin import ImageDownloader, GoogleImageCrawler
from multiprocessing import Process, Manager


def download_image_from_keyword(keyword: str, index: int) -> None:
    google_crawler = GoogleImageCrawler(storage={'root_dir': './'}, downloader_cls=ImageDownloader)
    google_crawler.crawl(keyword=keyword, max_num=1, file_idx_offset=index)


def find_file(file):
    if len(file) == 1:
        file = '00000' + file
    elif len(file) == 2:
        file = '0000' + file

    for root, dirs, files in os.walk(os.getcwd()):
        for i in files:
            if os.path.splitext(i)[0] == file:
                return i

    return False


def downloaded_image_map_with_keyword_and_check(keywords: dict):
    imgs = [os.path.splitext(f) for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg', '.webp', '.gif', '.bmp'))]

    keys = []
    for key in keywords.keys():
        if key == 9:
            keys.append('000010')
        elif len(str(key)) == 1:
            keys.append('00000' + str(key+1))
        elif len(str(key)) == 2:
            keys.append('0000' + str(key+1))

    for img in imgs:
        if img[0] in keys and not isinstance(keywords.get(int(img[0])-1), list):
            keywords[int(img[0])-1] = [keywords.get(int(img[0])-1), img[0]+img[1]]

    if len(imgs) == len(keywords):
        return (True, keywords)

    return (False, keywords)


def download_images_from_keyword_multithreading(keywords: dict, max_workers=10) -> dict:
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        for i in range(len(keywords)):
            if not isinstance(keywords.get(i), list):
                executor.submit(download_image_from_keyword, keywords.get(i), i)

    downloaded, keywords = downloaded_image_map_with_keyword_and_check(keywords)

    if downloaded:
        return keywords

    for i in range(len(keywords)):
        if not isinstance(keywords.get(i), list):
            download_images_from_keyword_multithreading(keywords)

    return keywords


def download_images_from_keyword_multiprocessing(keywords: dict, max_workers=10) -> dict:
    with Manager() as manager:
        keywords = manager.dict(keywords)
        processes = []

        for i in range(len(keywords)):
            if not isinstance(keywords.get(i), list):
                p = Process(target=download_image_from_keyword, args=(keywords.get(i), i))
                processes.append(p)
                p.start()

        for p in processes:
            p.join()

        downloaded, keywords = downloaded_image_map_with_keyword_and_check(dict(keywords))

        if downloaded:
            return keywords

        for i in range(len(keywords)):
            if not isinstance(keywords.get(i), list):
                download_images_from_keyword_multithreading(keywords)

    return keywords