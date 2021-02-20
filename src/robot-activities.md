---
layout: layouts/robot-activities.njk
subtitle: Check out a great collection of activities you can do with your robots to develop your computational thinking and programming skills.
eleventyNavigation:
  parent: Activities with Robots
  order: 2
permalink: "/learn/robots/{{ robot | slug }}/"
pagination:
  data: collections
  size: 1
  alias: robot
  filter:
    - resources
    - activities
    - unpluggedActivities
    - onscreenActivities
    - hybridActivities
    - projects
    - guides
  addAllPagesToCollections: true
---
