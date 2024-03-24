def split_sentence_into_phrases(sentence, max_phrase_length=10):
    words = sentence.split()
    phrases = []
    current_phrase = ""
    for word in words:
        if len(current_phrase.split()) < max_phrase_length:
            current_phrase += word + " "
        else:
            phrases.append(current_phrase.strip())
            current_phrase = word + " "
    if current_phrase:
        phrases.append(current_phrase.strip())
    return phrases

# Example usage:
sentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
phrases = split_sentence_into_phrases(sentence)
print(phrases)
