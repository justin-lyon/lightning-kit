# README

> A generic Static Resource Dev Kit for Lightning Experience development.

---
### Includes

* `js/acumen-debouncer.js`
	* A lightning compatible debouncer to delay actions.
* `js/acumen-navigator.js`
	* Helper functions to open links by SObject or URL through the `force:navigate` events.
* `js/acumen-toaster.js`
	* Helper functions to fire toasts from the `force:showToast` event.
* `js/acumen-action.js`
	* Helper functions to call method on Apex class.
* `css/master.css`
	* CSS Starter Template for Lightning Development.

---
### Usage

#### Add to your Component

```html
<ltng:require
	styles="{!join(',',
		$Resource.lightningKit + '/lightning-kit/css/master.css')}"
	scripts="{!join(',',
		$Resource.lightningKit + '/lightning-kit/js/acumen-debouncer.js',
		$Resource.lightningKit + '/lightning-kit/js/acumen-navigator.js',
		$Resource.lightningKit + '/lightning-kit/js/acumen-action.js',
		$Resource.lightningKit + '/lightning-kit/js/acumen-toaster.js')}"
	afterScriptsLoaded="{!c.scriptsLoaded}"/>
```

#### Debouncer Usage

> (!) In order for multiple components to use debouncer, an instance of debouncer is assigned to a local attribute in the component. In this way, any one component can have its own instance of `.search()`. Otherwise, multiple components using the debouncer would collide on this function.

```html
...
<ltng:require scripts="{!join(',',
		$Resource.LightningKit + '/lightning-kit/js/acumen-debouncer.js')}"
	afterScriptsLoaded="{!c.scriptsLoaded}" />
<aura:attribute name="acumenDebouncer" type="Object" description="acumen-debouncer instance" />
...
```

```javascript
({
	onKeyUp : function(cmp, event, helper) {
		// Call the new debounced search prop (from after scripts loaded) on acumen.debouncer
		var debouncer = cmp.get("v.acumenDebouncer");
		debouncer.search();
	},

	scriptsLoaded: function(cmp, event, helper) {
		/*
			After scripts loaded, initialize a debouncer on the search function.
			Assigned to a new prop on acumen.debouncer
			$A.getCallback registers the setTimeout to the framework to observe the
			the async callback within the helper.requestContacts function.
		*/
		var debouncer = acumen.debouncer;

		debouncer.search = debouncer.debounce($A.getCallback(function() {
			var searchText = cmp.get("v.searchText");
			if(searchText.length > 2) {
				helper.requestRecords(cmp);
			}
		}), 500);

		cmp.set("v.acumenDebouncer", debouncer);
	}
})
```

#### Navigator Usage

```javascript
({
	navigateToRecord : function(cmp, event, helper) {

		var recordId = cmp.get("v.recordId");
		acumen.navigator.navigateToSObject(recordId);
	}
})
```

#### Toaster Usage

```javascript
({
	createContact : function(cmp) {
		var contact = cmp.get("v.contact");
		var action = cmp.get("c.saveNewContact");

		action.setParams({
			contact: contact,
		});

		action.setCallback(this, function(response) {
			var state = response.getState();

			if(state === "SUCCESS") {
				// Send Success Toast
				acumen.toaster.success("Saved", contact.FirstName + " " + contact.LastName);
			} else {
				// Send Error Toast
				acumen.toaster.error("Error", "Could not save contact.");
			}
		});

		$A.enqueueAction(action);
	}
})
```

#### Action Usage

```javascript
({
	createContact : function(cmp, event, helper) {

		var action = {};
		action.name = "c.saveNewContact";
		action.params = {
			contact: cmp.get("v.contact")
		};
		action.onSuccess = function(response){
			//do something here on success
		};
		//optional
		action.onError = function(response){
			//do something here on error
		};
		acumen.action.call(component, event, helper, action);
	}
})
```