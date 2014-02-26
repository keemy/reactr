#!/usr/bin/python
print "Content-Type: text/html"
print


import cgi
import cgitb
import sqlite3
cgitb.enable()
conn = sqlite3.connect('results.db')
#CREATE TABLE results ( username TEXT, result INTEGER, testID TEXT,time TEXT )
c=conn.cursor()


form=cgi.FieldStorage()

if "readonly" not in form:
	pass
 #   c.execute("UPDATE counter SET num=num+1")
else:
	if form["readonly"]=="false":
		print 'INSERT INTO results VALUES ( "'+form["username"]+'", '+form["result"]+', "'+form["type"]+'", datetime("now"))'
		c.execute('INSERT INTO results VALUES ( "'+form["username"]+'", '+form["result"]+', "'+form["type"]+'", datetime("now"))')
		print 'INSERT INTO results VALUES ( "'+form["username"]+'", '+form["result"]+', "'+form["type"]+'", datetime("now"))'
	else:
		pass
		
#c.execute("SELECT * from counter")
#count=c.fetchone()
#print count[0]


conn.commit()
conn.close()

