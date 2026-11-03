# Skyrim · Legacy of the Dragonborn — Museumsatlas

**Live-Seite (nach GitHub Pages-Aktivierung):** https://peddii-cell.github.io/SkyrimLotD/

## Derzeit umgesetzt

- 2.769 aus einer Community-Checkliste kuratierte Einträge, verteilt auf 13 Museumshallen
- Ausschluss der ausdrücklich als eigenständige Fremdmods ausgewiesenen Inhalte (Wyrmstooth, Forgotten City, Vigilant usw.)
- Berücksichtigt werden Skyrim-Hauptspiel, Dawnguard, Dragonborn, Hearthfire, ausgewiesene Anniversary-/Creation-Club-Inhalte sowie Legacy of the Dragonborn selbst
- Questführer mit Einstiegsübersicht statt einer endlosen Itemliste; Auswahl nach Hauptquest, Gefährten, Akademie von Winterfeste, Diebesgilde, Dunkler Bruderschaft und weiteren Questlinien
- Separater Bereich **Herstellung** für gewöhnliche Rüstung, Waffen und reine Herstellungsobjekte (derzeit 278 algorithmisch erkannte Einträge); einzigartige Questobjekte mit Schmiedeschritt bleiben bei den Quests
- Separater Bereich **Sammelziele** mit 24 Barenziah-Steinen, 5 Gauldur-Queststationen und 6 Seelengrab-Orientierungspunkten (35 Zusatz-Ziele, mit eigenem Abhakstatus)
- Suche nach Namen, Ort, Quest oder Museumsbereich; Filter nach Art, Inhalt, Halle, Fortschritt und regionaler Kartierbarkeit
- Deutsche Benutzeroberfläche, deutsche Itemnamen nur bei bekannten sicheren Übersetzungen; englische Quellnamen bleiben zum Nachschlagen erhalten
- Anklickbare Sammelliste mit Fortschrittsanzeige und lokalem Browser-Speicher, JSON-Export und Import
- Zoombare und verschiebbare Karte mit separat eingefärbten Queststart- und Fundregion-Markern, soweit sich die Quelle einer Region zuordnen lässt
- Keine Regionssummen mehr: Karte startet ohne Marker. Erst die Auswahl eines konkreten Gegenstands zeigt dessen Fundort; erneutes Klicken entfernt den Marker. Queststart kann im Detailbereich separat eingeblendet werden.
- Umschaltung Himmelsrand / Solstheim / schematische Seelengrab-Orientierung, mit sofort sichtbaren Ersatzkarten, falls externe Kartenbilder nicht laden.

## Wichtig: Dies ist noch **keine verifizierte vollständige LotD-v6-Datenbank**

Die 2.769 Museums-Einträge stammen aus einer öffentlichen, von Fans gepflegten Tabelle, deren Quellenfilter nur anhand der dortigen *Content Source*-Spalte erfolgt. Nicht alle Quellenzuordnungen oder Museumsplätze sind für die aktuelle Modversion verifiziert. Die Liste kann Einträge enthalten, die in der gewünschten Modkonfiguration nicht verfügbar sind, und umgekehrt Einträge auslassen.

Die Quelltabelle enthält bei vielen Gegenständen den Fundort, den Museumsplatz und die Quest, **aber nicht stets den genauen Queststarter, alle Voraussetzungen, eine Schritt-für-Schritt-Anleitung oder Koordinaten**. In der Website werden deshalb keine fehlenden Koordinaten erfunden: Die verfügbaren Pins kennzeichnen nur eine **ungefähre Region**, niemals einen bestätigten exakten Loot-Standort. Der blaue Queststart-Marker erscheint nur für eine kleine Zahl separat bekannter Quests. Einträge ohne geprüften Marker zeigen den Fundorttext.

**Die verlinkte externe Tamriel.app-3D-Karte übernimmt unsere Marker nicht.** Sie wird separat geöffnet. Die eigene 2D-Kartenansicht bindet eine öffentlich zugängliche UESP-Karte als Hintergrund ein, bei Netz- oder Ladefehlern erscheint eine stilisierte Ersatzkarte.

## Daten & Dateien

- `index.html` — Website / Darstellung
- `app.js` — Suche, Filter, Karte, Fortschritt und Import/Export
- `data/hall-01.json` … `data/hall-13.json` — nach Museumsraum gefilterte Sammlereinträge
- `data/guides.json` — separate Queststationen und Sammelziele
- `data/skyrim-places.json` — 350 weitere kanonische Skyrim-Orte (aus öffentlich dokumentiertem SSEEdit-MapMarker-Export, auf 2D-Atlaspositionen umgerechnet; Quellenverweis unten)

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

## Aktueller Stand (3. November 2026)

Die GitHub-Dateien enthalten die neue Navigation. Ob GitHub Pages den neuesten Commit erfolgreich ausliefert, ist nicht automatisch verifiziert. Die 2.769 Museumseinträge sind weiterhin nicht vollständig einzeln auf Questgeber und Fundort geprüft. Die 35 zusätzlichen Sammelziele enthalten vorläufige Weltkarten-/Schemamarker; keine durchgängig exakte Navigation im Dungeon. **Stand 3. November 2026:** Für 1.217 der 2.769 Museumseinträge konnte anhand der vorhandenen Fundortangabe ein Weltkartenmarker zugeordnet werden (44,0 %). Darunter befinden sich nur ungefähre Orte und Einstiegspunkte, nicht ausschließlich einzeln bestätigte Loot-Koordinaten. 1.552 Einträge sind unkartiert, teils weil die Quelle nur `Random Loot`, Händler, Herstellung oder kein festes Ziel nennt, teils weil Ortsdaten noch fehlen. Die User-Anforderung „jedes Item mit festem Fundort auf der Karte“ ist noch nicht vollständig erfüllt.

## Quellen für die Ortskoordinaten (November 2026)

Ein Teil der Weltkartenmarker basiert auf einem veröffentlichten **SSEEdit MapMarker-Export** mit 350 Skyrim-Landmarks: https://github.com/lcbmann/keizaal-ranger-map/blob/main/data/skyrim-canon-atlas.generated.json. Für die Website wurden daraus nur Ortsnamen und Kartenpositionen übernommen und die Positionen auf Prozentwerte bezogen. Die zugehörige Kartenbild-Kalibrierung und LotD-spezifische Objekte erfordern weitere Einzelprüfung. Die Datensätze enthalten ausdrücklich markierte **Zugangspunkte** für getrennte Spielgebiete (Vergessenes Tal über Darkfall Cave; Dead Man's Dread über Orphan's Tear) und keine behaupteten Item-Koordinaten innerhalb dieser Gebiete.
