import pymysql
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import json


def get_db_connection():
    db = pymysql.connect(
        host='database',
        database='works',
        user='root',
        password='2901'
    )
    return db


app = Flask(__name__)
CORS(app)


@app.route('/api', methods=["GET"])
def api():

    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM my_works")
    data = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(data)


@app.route('/send_from_api', methods=["POST", "GET"])
def send_from_api():
    title = request.form.get('title')
    text = request.form.get('text')
    link = request.form.get('json_link')

    link = json.loads(link)

    

    if link == None or len(link) == 0:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(f"INSERT INTO my_works (title, text) VALUES ('{title}', '{text}')")
        db.commit()
    else:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(f"INSERT INTO my_works (title, text, data_link) VALUES ('{title}', '{text}', '{json.dumps(link)}')")
        db.commit()



    


    
    cursor.close()
    db.close()

    return jsonify({"res":"comlete"})

@app.route('/delete_item', methods = ["POST", "GET"])
def delete_from_db():
    try:
        del_id = request.form.get('del')
    
        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute(f"DELETE FROM my_works WHERE id={del_id}")

        db.commit()
        
        return jsonify({"res": "Good"})
    except Exception as err:
        return jsonify(err)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
