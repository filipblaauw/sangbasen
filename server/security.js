// Any client may insert, update, or remove a post without restriction
Songs.permit(['insert', 'update', 'remove']).apply();
Users.permit('remove').ifHasRole('admin').apply();
