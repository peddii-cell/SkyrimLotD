# Skyrim · Legacy of the Dragonborn — Museumsatlas

**Live-Seite (nach GitHub Pages-Aktivierung):** https://peddii-cell.github.io/SkyrimLotD/

## Derzeit umgesetzt

- 2.769 aus einer Community-Checkliste kuratierte Einträge, verteilt auf 13 Museumshallen
- Ausschluss der ausdrücklich als eigenständige Fremdmods ausgewiesenen Inhalte (Wyrmstooth, Forgotten City, Vigilant usw.)
- Berücksichtigt werden Skyrim-Hauptspiel, Dawnguard, Dragonborn, Hearthfire, ausgewiesene Anniversary-/Creation-Club-Inhalte sowie Legacy of the Dragonborn selbst
- Suche nach Namen, Ort, Quest oder Museumsbereich; Filter nach Art, Inhalt, Halle, Fortschritt und regionaler Kartierbarkeit
- Deutsche Benutzeroberfläche, deutsche Itemnamen nur bei bekannten sicheren Übersetzungen; englische Quellnamen bleiben zum Nachschlagen erhalten
- Anklickbare Sammelliste mit Fortschrittsanzeige und lokalem Browser-Speicher, JSON-Export und Import
- Zoombare und verschiebbare Karte mit separat eingefärbten Queststart- und Fundregion-Markern, soweit sich die Quelle einer Region zuordnen lässt
- Optionale Regionsübersicht mit der Anzahl zugehöriger Einträge; Umschaltung Himmelsrand / Solstheim

## Wichtig: Dies ist noch **keine verifizierte vollständige LotD-v6-Datenbank**

Die 2.769 Einträge stammen aus einer öffentlichen, von Fans gepflegten Tabelle, deren Quellenfilter nur anhand der dortigen *Content Source*-Spalte erfolgt. Nicht alle Quellenzuordnungen oder Museumsplätze sind für die aktuelle Modversion verifiziert. Die Liste kann Einträge enthalten, die in der gewünschten Modkonfiguration nicht verfügbar sind, und umgekehrt Einträge auslassen.

Die Quelltabelle enthält bei vielen Gegenständen den Fundort, den Museumsplatz und die Quest, **aber nicht stets den genauen Queststarter, alle Voraussetzungen, eine Schritt-für-Schritt-Anleitung oder Koordinaten**. In der Website werden deshalb keine fehlenden Koordinaten erfunden: Die verfügbaren Pins kennzeichnen nur eine **ungefähre Region**, niemals einen bestätigten exakten Loot-Standort. Der blaue Queststart-Marker erscheint nur für eine kleine Zahl separat bekannter Quests. Einträge ohne geprüften Marker zeigen den Fundorttext.

**Die verlinkte externe Tamriel.app-3D-Karte übernimmt unsere Marker nicht.** Sie wird separat geöffnet. Die eigene 2D-Kartenansicht bindet eine öffentlich zugängliche UESP-Karte als Hintergrund ein, bei Netz- oder Ladefehlern erscheint eine stilisierte Ersatzkarte.

## Daten & Dateien

- `index.html` — Website / Darstellung
- `app.js` — Suche, Filter, Karte, Fortschritt und Import/Export
- `data/hall-01.json` … `data/hall-13.json` — nach Museumsraum gefilterte Sammlereinträge

**Community-Quelle:** https://docs.google.com/spreadsheets/d/1uWJs4adekvTOL-z7bRSf-JwUi7bX1bFQqlKPEv5k0qc/edit

Weitere Nachschlagewerke:
- https://legacy-of-the-dragonborn.fandom.com/wiki/Spoiler_List
- https://en.uesp.net/
- https://tamriel.app/skyrim/interactive-map

Diese Quellen sind keine Garantie für vollständige, versionsgleiche oder fehlerfreie Daten. Bei der weiteren Validierung sollte je Eintrag mit den tatsächlichen v6-Ausstellungsdaten verglichen werden.

## GitHub Pages

**Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save.**

Danach erscheint die Website unter https://peddii-cell.github.io/SkyrimLotD/ (ggf. nach einigen Minuten).

## Fortschritt / Datenschutz

Häkchen werden nur im lokalen Speicher des verwendeten Browsers gespeichert, **nicht im GitHub-Konto**. Backup über die Schaltfläche `Fortschritt sichern` herunterladen. Beim Gerätewechsel per `Importieren` laden. Änderungen am Browser/Cache können ohne Backup zum Verlust von Markierungen führen.

Nicht kommerzielles Fanprojekt. Keine offizielle Seite von Bethesda oder den LotD-Entwicklern.
