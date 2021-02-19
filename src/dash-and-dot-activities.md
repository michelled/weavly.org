---
layout: layouts/robot-activities.njk
title: Activities with Dash & Dot
robot: Dash & Dot
subtitle: Check out a great collection of activities you can do with your robots to develop your computational thinking and programming skills.
eleventyNavigation:
  parent: Learn
  key: Activities with Dash & Dot
  order: 2
permalink: "/learn/robots/dash-and-dot/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.dashAndDotActivities
  size: 10
  alias: robotActivities
---
