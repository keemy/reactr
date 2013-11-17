#!/usr/bin/python
print "Content-Type: application/json"
print


import cgi
import cgitb
import sqlite3
cgitb.enable()
conn = sqlite3.connect('test.db')
c=conn.cursor()


form=cgi.FieldStorage()

if "readonly" not in form:
    c.execute("UPDATE counter SET num=num+1")

c.execute("SELECT * from counter")
count=c.fetchone()
print count[0]


conn.commit()
conn.close()

