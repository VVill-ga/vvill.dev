---
title: ":mountain: TopoToucher"
image: /img/topotoucher.webp
desc: 
    - >-
        Written in C++ using OpenGL, TopoToucher is a heightmap sandbox program
        that gives you the power of pushing points on a grid up and down to
        create interesting terrain visualizations. The fun part comes with the
        variable area-of-effect and different rolloff functions available to you.

    - >-
        TopoToucher uses many keyboard controls, so make sure to check the
        README.md file or read the post before trying out the program. I'll 
        write about how the program works, some problems I overcame writing it,
        and the features I'd like to implement in the future.
tags:
    - C/C++
    - Graphics
links: 
    - link: https://github.com/VVill-ga/topotoucher
      text: Github Repo
date: 2023-12-12
---

TopoToucher is a heightmap sandbox program that gives you the power of pushing 
points on a grid up and down to create interesting terrain visualizations. A
complete 

## On Heightmaps

Heightmaps are an amazing and efficient way to store a whole 3D model
as a single image. Acres of digital topography to explore, all stored on two
dimensions! As I learned more about heightmaps and how they are commonly used, 
I had a few questions about why they are used how they are. 

### Why ◩ How about ⛝?

When heightmaps are rendered, the top-down wireframe view looks like a grid
with a single slash across each square (in order to turn them into triangles
for easier rendering by the GPU). I had a problem with that. Imagine a 3 x 3 
grid of vertexes. Now imagine a diagonal line of those vertexes raised above
the rest. With our 5-line squares, there will either be a single raised edge
running along those raised vertexes, or three peaks with lines coming down from
all sides of each one.
\
\
What if, instead of two triangles, we stuck a vertex in the center and made 
four triangles, each pointing at the center? And that center point can be
interpolated between the four surrounding points! This would result in higher
detail heightmap meshes, and everything would be uniform, no matter which way 
you slice it! 
\
\
Unfortunately, what you'd be sacrificing there would be performance. And a whole
lot of it. It's not just the fact that you'd be doubling the number of faces in
the mesh, but you'd be sacrificing the power of triangle strips. GPUs are very
good at doing one small thing many times, so one of the easiest ways to build
meshes is with *triangle strips*. This technique is performed once on each row and
includes remembering the last two vertexes and adding another one to create a
new triangle, like so: `◩◩◩◩◩◩`. Imagine adding the vertexes to a list in a row,
doing one top vertex, then the bottom one, moving over and doing the top one,
and so on.

### Why Black and White?

*"Why are heightmap images always in black and white? Why not use the full range
of RGB to store higher detail height differences? Aren't we wasting space?"* 
\
\
When building or taking apart a heightmap image, each pixel is made of a red, 
green, and blue value. In a grayscale image, those red green and blue values are 
exactly the same. So why not use the extra bits to store more detail instead of 
copying the same value 3 times?
\
\
As it turns out, pictures are smart. Most popular image formats, including PNG,
JPEG, and BMP are all optimized to store grayscale images without any color data
-- just the shade of gray -- and therefore, save a lot of space compared to a
full color image. When you load the image up in a program however, it must
adhere to the data structure it is being loaded into, and the program copies the
shade of gray to each color channel.


## Features

This section is also written in the [Github Readme file](https://github.com/VVill-ga/topotoucher)
so if you've already read that, skip to the [difficulties section](#difficulties).

### Rolloff Functions

[![Desmos](https://github.com/VVill-ga/topotoucher/raw/main/readme_img/desmos.png)](https://www.desmos.com/calculator/wtvw4yahfq)

### Lighting




## Difficulties

### Aligning Vertex Location Equations


## Future Plans

This project has massive room for growth. From beautifying to feature adding,
and a whole lot of optimizing. Here's my to-do list!

### Shaders

Falling into the category of both beautifying and optimizing, one thing I need
to do is move some implementation over to shader code. A fragment shader would
do the terrain coloring much better (and even lay ground for some cooler 
stylized textures), and the program will be made much more performant when the
heightmap displacement is performed and stored on the GPU with a vertex shader.
In order to keep the traffic to a minimum, the heightmap itself would be stored 
in VRAM.

### Skybox

The matte color background this program has is pretty boring. I'd like to
create a skybox (or in OpenGL terms: cubemap) texture. I'm not sure if I want 
to try to procedurally generate one or just design one or find one online yet, 
but regardless, one is sorely needed.

### BMP Import/Export

This is the to-do item that transitions this program from being a fun toy to an
actual tool. The ability to export a map you've created in TopoToucher as an 
image, and render it as a heightmap somewhere else shouldn't be too hard to
implement. I have worked with bmp images before as textures in other graphics
projects and I believe they will be the easiest to write and read from.

### Click to Select



### Custom Color Layers



### Vulkan Rewrite + Multiproccessing


