#!/usr/bin/python
print "Content-Type: text/html"
print



import cgitb
cgitb.enable()
conn = sqlite3.connect('test.db')
c=conn.cursor()

c.execute("UPDATE counter SET num=num+1")

c.execute("SELECT * from counter")
count=c.fetchone()
print count



