import Ember from 'ember';
import ENV from '../config/environment';

const {
  A: emberArray
} = Ember;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  this.passthrough('/write-coverage');

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = `${ENV.rootURL}/api`; // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/users', function(schema, request) {
    let { page, limit, sort, dir } = request.queryParams;
    let users = schema.users.all().models;

    page = Number(page || 1);
    limit = Number(limit || 20);
    dir = dir || 'asc';

    let meta = {
      page,
      limit,
      totalPages: Math.ceil(users.length / limit)
    };

    if (sort) {
      users = emberArray(users).sortBy(sort);
      if (dir !== 'asc') {
        users = users.reverse();
      }
    }

    let offset = (page - 1) * limit;
    users = users.slice(offset, offset + limit);

    return { users, meta };
  });

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      let contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
