FROM python
WORKDIR /app
RUN pip install pymysql
RUN pip install flask
RUN pip install flask-cors
RUN pip install cryptography
COPY . .
CMD [ "python", "main.py" ]