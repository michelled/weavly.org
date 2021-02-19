---
layout: layouts/robot-activities.njk
title: Activities with Cubelets
robot: Cubelets
subtitle: Check out a great collection of activities you can do with your robots to develop your computational thinking and programming skills.
eleventyNavigation:
  parent: Learn
  key: Activities with Cubelets
  order: 2
permalink: "/learn/robots/Cubelets/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.CubeletsActivities
  size: 10
  alias: robotActivities
---
