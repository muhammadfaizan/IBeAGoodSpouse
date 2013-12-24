﻿/// <reference path="default.js" />
/// <reference path="provider.js" />

(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; },
        function groupSorter(item1, item2) {
            return item1 < item2 ? -1 : item1 === item2 ? 0 : 1;
        }
    );

    //Lists Start Here
var lists =  [{"title":"I be a Good Husband","key":"1","dataProvider":"static","subtitle":"Have a look here what you should do and what you shouldn&#39;t !?<br /><br />","backgroundImage":"/images/noImageGroup.png","content":null,"type":null,"param1":null,"param2":null,"description":null,"url":null,"id":"13872","providerid":null,"hideimage":false,"maxitems":0,"likesno":0,"commentsno":0,"date":"0001-01-01T00:00:00"},{"title":"I be a Good Wife","key":"2","dataProvider":"static","subtitle":"Have a look here what you should do and what you shouldn&#39;t !?","backgroundImage":"/images/noImageGroup.png","content":null,"type":null,"param1":null,"param2":null,"description":null,"url":null,"id":"13884","providerid":null,"hideimage":false,"maxitems":0,"likesno":0,"commentsno":0,"date":"0001-01-01T00:00:00"}]

//Lists End Here


    provider.process(lists, list);

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        getHubItems: getHubItems(),
        resolveGroupReference: resolveGroupReference,        
        appName: "I be a Good Spouse", //appName
        privacyUrl: "http://www.zipapp.co.uk/Application/Privacy/9959", //privacyUrl
        resolveItemReference: resolveItemReference
    });

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    function getHubItems() {
        var _items = list.createFiltered(filterPredicate);
        var groupList = _items.createGrouped(
                function groupKeySelector(item) { return item.group.key; },
                function groupDataSelector(item) { return item.group; },
                function groupSorter(item1, item2) {
                    return item1 < item2 ? -1 : item1 === item2 ? 0 : 1;
                }
            );

        return groupList;
    }

    function filterPredicate(item) {
        if (item.showOnHub) {
       // console.log("Filter: Item: " + item.title + " Group: " + item.group.title + " Show: " + item.showOnHub)
            }
        return item.showOnHub == true;
    }

    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }
})();
