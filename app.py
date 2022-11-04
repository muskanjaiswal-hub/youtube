from flask import Flask, request, render_template, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_path = './summarizer_model'


def get_summary(text):
    model = pipeline('summarization', model=model_path,
                     tokenizer=model_path)
    length = len(text)
    summary = []
    num_iters = int(length / 2000)
    for i in range(0, num_iters + 1):
        start = 0
        start = i * 2000
        end = (i + 1) * 2000
        res = model(text[start:end])
        res = res[0]
        res = res['summary_text']
        summary.append(res)
    return summary


def get_transcript(videoid):
    script = YouTubeTranscriptApi.get_transcript(videoid)
    subtitle = ''
    for segment in script:
        subtitle = subtitle + ' ' + segment['text']
    return subtitle


@app.route('/', methods=["GET", "POST"])
def home():
    return "Home Page"


# @app.route('/run_next/', methods=["GET", "POST"])
# def summarization():
#     subtitle = ''
#     rrtt = 'An article is any member of a class of dedicated words that are used with noun phrases to mark the identifiability of the referents of the noun phrases. The category of articles constitutes a part of speech.'
#     if request.method == "POST":
#         videoid = request.form.get('vid-id', '')
#         transcript = get_transcript(videoid)
#         vid_summary = get_summary(subtitle)
#         return render_template('index.html', post=vid_summary)

#     elif request.method == "GET":
#         return render_template('index.html', post=subtitle)


@app.route('/api/summarize', methods=["GET"])
def home_function():
    url = request.args.get('youtube_url')
    video_id = url.split("=")[1]
    try:
        transcript = get_transcript(video_id)
        summary_final = get_summary(transcript)
        return jsonify({'message': summary_final})
    except:
        return jsonify({'message': 'ERROR:Check the URL or try again with different URL'})


if __name__ == '__main__':
    app.run(debug=True)
