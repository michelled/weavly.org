---
layout: layouts/robot-activities.njk
title: Activities with Cubetto
robot: Cubetto
subtitle: Check out a great collection of activities you can do with your robots to develop your computational thinking and programming skills.
eleventyNavigation:
  parent: Learn
  key: Activities with Cubetto
  order: 2
permalink: "/learn/robots/cubetto/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.cubettoActivities
  size: 10
  alias: robotActivities
---
