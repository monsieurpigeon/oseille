import PouchDB from 'pouchdb';
import auth from 'pouchdb-authentication';

PouchDB.plugin(auth);

export interface Post {
  title: string;
}

const remotePublicDatabase = new PouchDB('https://couchdb.oseille.app/posts', { skip_setup: true });
export const publicDatabase = new PouchDB('posts');

PouchDB.sync(publicDatabase, remotePublicDatabase, {
  live: true, // replicate changes in live
  timeout: false, // disable timeout
  retry: true, // retry sync if fail
}).on('error', console.error.bind(console));

export const login = (username: string, password: string) => remotePublicDatabase.logIn(username, password);
export const logout = () => remotePublicDatabase.logOut();
export const signup = (username: string, password: string) =>
  remotePublicDatabase.signUp(username, password, function (err, response) {
    if (err) {
      console.log(err);
      if (err.name === 'conflict') {
        // "batman" already exists, choose another username
      } else if (err.name === 'forbidden') {
        // invalid username
      } else {
        // HTTP error, cosmic rays, etc.
      }
    }
  });

export const addPost = (post: Post) => publicDatabase.post(post);

export const getPosts = () =>
  publicDatabase
    .allDocs({
      include_docs: true,
      descending: true,
    })
    .then((doc) => doc.rows.map((row) => row.doc as unknown as Post));

export const onPostsChange = (callback: (value: any) => any) =>
  publicDatabase.changes({ since: 'now', live: true }).on('change', callback);
