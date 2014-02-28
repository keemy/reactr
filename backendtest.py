#!/usr/bin/python
print "Content-Type: text/html"
print


import cgi
import cgitb
import sqlite3
import json
import datetime
import time
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
			epoctime=time.mktime(datetime.datetime.strptime(row[3],"%Y-%m-%d %H:%M:%S").timetuple())*1000
			if row[2] in data:
				data[row[2]].append([epoctime,row[1]])
			else:
				data[row[2]]=[[epoctime,row[1]]]
		output=[]
		for test in data:
			temp={"name":test}
			temp["data"]=data[test]
			output.append(temp)
		print json.dumps(output)
		
#c.execute("SELECT * from counter")
#count=c.fetchone()
#print count[0]


conn.commit()
conn.close()

