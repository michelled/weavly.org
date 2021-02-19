---
layout: layouts/robot-activities.njk
title: Activities with {{ robot }}
robot: Sphero
subtitle: Check out a great collection of activities you can do with your robots to develop your computational thinking and programming skills.
eleventyNavigation:
  parent: Learn
  key: Activities with {{ robot }}
  order: 2
permalink: "/learn/robots/{{ robot | slug }}/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.robotActivities
  size: 10
  alias: robotActivities
---
