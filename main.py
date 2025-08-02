from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Vercel!"

# REQUIRED: Vercel uses this name to run the server
handler = app
