# EnviSciLandHag — Hagonoy GroundWatch

An Environmental Science project on land subsidence in Hagonoy, Bulacan. It covers how groundwater pumping makes the ground sink, local causes and effects, an interactive barangay map, a quiz, and a community report form (prototype).

## Run it

```bash
npm install
npm start
```

Then open http://localhost:3000. Set `PORT` to use a different port. `npm run dev` restarts on file changes.

## Structure

```
server.js          Express server (serves public/)
public/index.html  The page
public/style.css   Styles
public/hagonoy.js  Map switcher, quiz, report form
```

## Notes

- The report form is a prototype. Nothing is sent anywhere. Replace it with a Google Form embed when ready.
- The map uses Google Maps embeds and fonts load from Google Fonts, so an internet connection is needed for those.
- Add authors and dates for the (n.d.) references before submitting.
