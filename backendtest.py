#!/usr/bin/python
print "Content-Type: text/html"
print


import cgi
import cgitb
import sqlite3
import json
cgitb.enable()
conn = sqlite3.connect('results.db')
#CREATE TABLE results ( username TEXT, result INTEGER, testID TEXT,time TEXT )
c=conn.cursor()


form=cgi.FieldStorage()


#don't want injection attacks
def clean(text):
	return "".join([l for l in text if l.isalnum()])

if "readonly" not in form:
	pass
 #   c.execute("UPDATE counter SET num=num+1")
else:
	userName=clean(form["username"].value)
	
	if form["readonly"].value=="false":
		
		result=clean(form["result"].value)
		type=clean(form["type"].value)
		print (userName,int(result),type)
		c.execute('INSERT INTO results VALUES ( ?, ?, ?, datetime("now"))', (userName,int(result),type))
		
	else:
		data={}
		for row in c.execute("SELECT * FROM results WHERE username=? ORDER BY time ASC  LIMIT 10000",(userName,)):
			if row[2] in data:
				data[row[2]].append([row[3],row[1]])
			else:
				data[row[2]]=[[row[3],row[1]]]
		print json.dumps(data)
		
#c.execute("SELECT * from counter")
#count=c.fetchone()
#print count[0]


conn.commit()
conn.close()

