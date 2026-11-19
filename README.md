# דף נחיתה – קליקינג

דף נחיתה לאיסוף לידים של לקוחות שמתעניינים בשיווק דיגיטלי.

- `index.html` – הדף כולו (HTML + CSS + JS בקובץ אחד)
- `assets/logo.png` – הלוגו

## לאן נשלחים הלידים
בראש הסקריפט שבתחתית `index.html` יש את השדה `FORM_ENDPOINT`.
- ריק: שליחת הטופס פותחת ווטסאפ עם פרטי הפנייה למספר העסק.
- כתובת Formspree (או שירות דומה): הפניות נשלחות למייל.

## גרסת אלמנטור
`elementor/clicking-landing-elementor.json` – תבנית לייבוא לאלמנטור Pro
(Templates → Saved Templates → Import Templates). הטופס בנוי מווידג'ט Form של אלמנטור Pro ושולח את הלידים במייל.
