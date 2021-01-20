---
layout: layouts/activities-type
title: On-Screen Activites
permalink: "/learn/activities/on-screen/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
eleventyNavigation:
  parent: Activities Library
  key: On-Screen Activities
  order: 1
pagination:
  data: collections.onscreenActivities
  size: 10
  alias: activities
---
