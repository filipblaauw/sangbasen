# sangbasen

Description: My personal song database for uploading sheet music, backing tracks and transposable chord diagrams. Store files to S3, and connected to MLAB Mongo database.

### Features
- Create users with usernames
- Password reset from mail
- Upload PDF or write chords in ChordPro format
- Transposable chords if ChordPro format is provided
- Search in song titles, genres, lyrics
- Download PDFs to Dropbox
- Generates .chordpro files for download
- Set or un-set favorite songs
- Add Spotify embed from Spotify URI
- Set tempo, key and time signature for best ChordPro compatibility
- Upload backingtracks
- Store all files to S3 Bucket

### Run with
    $ meteor --settings settings.json

### Deploy to galaxy
    $ DEPLOY_HOSTNAME=eu-west-1.galaxy.meteor.com meteor deploy sangbasen --settings settings.json
