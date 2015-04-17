# hyper-resource
Angular ngResource-like provider for consuming ReST HyperMedia

# GOALS
Eventually, I want to support the major JSON formats (Siren, HAL, JSON+Collection, JSONAPI, etc)

Most of this I hope to come from the community.

For right now, it just assumes Siren (Mostly because that's the project I needed it for).

But I put in the "HyperMediaType" config setting so that later I can add more, as I learn more about the other formats.

# Use
Configure the ApiRoot in the config
```javascript
angular.module('someModule', [])
	.config(['HyperResourceProvider', function(HyperResourceProvider){
		HyperResourceProvider.SetApiRoot('http://my.server.com/api');
	}]);
```

Then make a HyperResource kind of the same way you make an ngResource

```javascript
angular.module('someModule')
	.factory('Person', [HyperResource, function(HyperResource){
		return HyperResource('/path/to/resource');
	}]);
```

This will use the path '/path/to/resource' and break it into three 'steps'

The first step will look be the root call (set in the config). Then it will look for a link with an rel of 'path'. It attempts to find the resource in cache (using session storage), and if it doesn't find it, it will make an $http call using the href of the link.

The second step will take the results from the first call and look for a link with a rel of 'to'; again searching cache first, then an  $http call if necessary.

Lastly, it will take the result from that call and find a link with a rel of 'resource'. Once it finds that payload, it will see that there are no more steps and return that payload.

