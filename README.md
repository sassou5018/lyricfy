# Small **NextJs** app that checks your currently playing track on spotify and returns the lyrics for it from genius.

_Due to the way Spotify's API functions i need to pre-allow access from their dashboard. There is quite literally no efficient way to automate this so if you wanna give this a try just drop your email address._

~~Also genius's API isn't much better since they don't parse spaces " " in their request params so any song title or artist name with more 3 space separated words is broken and returns an error.~~ **_-This was fixed -_**

App server and ~~database~~(_database no longer needed_) server both hosted on ~~railway~~ Netlify u can check it all out from [here](https://lyricfy.benahmed.tech).

---

**TODO:**

-   [x] Refresh Button Broken For Some Reason. (Go back to index page and reauth with spotify to refresh your currently playing song)
-   [ ] Play pause button no longer works. (Spotify updated their API)
-   [ ] Player progress bar broken

> I probably will never fix these.

![screenshot](https://iili.io/HnmB84p.md.png)
