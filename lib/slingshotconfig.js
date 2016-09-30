Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "application/pdf"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("myTrackUploads", {
  allowedFileTypes: ["audio/aiff", "audio/aac", "audio/mp4", "audio/mpeg", "audio/wav"],
  maxSize: null // 10 MB (use null for unlimited).
});
