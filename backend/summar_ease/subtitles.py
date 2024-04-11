
import subprocess


def get_video_duration(video_file_path: str) -> float:
    """
    Get the duration of a video file in seconds.
    
    Args:
        video_file_path (str): Path to the video file.
    
    Returns:
        float: Duration of the video in seconds.
    """
    try:
        result = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', video_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        duration = float(result.stdout)
    except Exception as e:
        print(f"Error getting video duration: {e}")
        duration = 0.0
    return duration

def format_time(seconds: float) -> str:
    """
    Format time in seconds to HH:MM:SS.SSS format.
    
    Args:
        seconds (float): Time duration in seconds.
    
    Returns:
        str: Formatted time string in HH:MM:SS.SSS format.
    """
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{int(hours):02d}:{int(minutes):02d}:{seconds:.3f}"


def generate_srt_file(video_files, subtitles, starting_time, i):
    """
    Generate an SRT string for the given list of video files and subtitles.
    
    Args:
        video_files (List[str]): List of video file paths.
        subtitles (List[str]): List of subtitles corresponding to each video file.
        starting_time (int): Starting time for the SRT file.
        
    Returns:
        Tuple[str, int]: SRT content as a string and end time of the last subtitle segment.
    """
    # Initialize start time for the first subtitle
    start_time = starting_time
    srt_content = ""

    for _, (video_file, subtitle) in enumerate(zip(video_files, subtitles), start=1):
        # Get duration of current video segment
        duration = get_video_duration(video_file)

        # Calculate end time for the subtitle segment
        end_time = start_time + duration

        # Write subtitle index
        srt_content += f"{i}\n"

        # Write time range
        srt_content += f"{format_time(start_time)} --> {format_time(end_time)}\n"

        # Write subtitle text
        srt_content += subtitle + "\n\n"

        # Update start time for next subtitle
        start_time = end_time

        i=i+1

    return srt_content, end_time, i

def concatenate_subtitles(subtitles_list, output_file):
    concatenated_subtitles = ""
    for subtitle_content in subtitles_list:
        concatenated_subtitles += subtitle_content + "\n\n"

    print(concatenated_subtitles)
    # Write the concatenated subtitles to the output file
    with open(output_file, "w") as f:
        f.write(concatenated_subtitles)

    print(f"Final subtitles saved to '{output_file}'")