---
layout: layouts/events.njk
title: Events
subtitle: Here you can find links to conferences, workshops, talks, camps, and other events that explore topics and resources related to accessible coding
eleventyNavigation:
  parent: Community
  key: Events
  order: 0
permalink: "/community/events/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.events
  size: 10
  alias: events
---
