Small **NextJs** app that checks your currently playing track on spotify and returns the lyrics for it from genius.
====
Due to the way Spotify's API functions i need to pre-allow access from their dashboard. There is quite literally no efficient way to automate this so if you wanna give this a try just drop your email address.

Also genius's API isn't much better since they don't parse spaces " " in their request params so any song title or artist name with more 3 space separated words is broken and returns an error.

App server and database server both hosted on railway u can check it all out from [here](https://lyricfy-production.up.railway.app).

![screenshot](https://iili.io/HnmB84p.md.png)
