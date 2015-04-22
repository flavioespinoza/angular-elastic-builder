(function(angular) {

  var app = angular.module('exampleApp', [
    'angular-elastic-builder',
  ]);

  app.controller('BasicController', function() {

    var data = this.data = {};

    data.query = [
      {
        'and': [
          {
            'range': {
              'credit.score': {
                'gte': 680
              }
            }
          },
          {
            'range': {
              'credit.score': {
                'lt': 850
              }
            }
          }
        ]
      },
      {
        'term': {
          'test.boolean': 0
        }
      },
      {
        'terms': {
          'test.state.multi': [ 'AZ', 'CT' ]
        }
      },
      {
        'not': {
          'filter': {
            'term': {
              'test.term': 'asdfasdf'
            }
          }
        }
      },
      {
        'exists': {
          'field': 'test.term'
        }
      }
    ];

    data.fields = {
      'test.number': { type: 'number', minimum: 600 },
      'credit.score': { type: 'number', minimum: 600 },
      'test.term': { type: 'term' },
      'test.boolean': { type: 'term', subType: 'boolean' },
      'test.state.multi': { type: 'multi', choices: [ 'AZ', 'CA', 'CT' ]}
    };

    data.needsUpdate = true;

    this.showQuery = function() {
      var queryToShow = {
        size: 0,
        filter: { and : data.query }
      };

      return JSON.stringify(queryToShow, null, 2);
    };

  });

})(window.angular);
