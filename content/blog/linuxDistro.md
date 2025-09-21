title: "NixOS: A Declarative System — For Better or Worse"
date: "2025-08-12"
author: "Petter Tesdal"
---

<!--more-->

# Background
I’ve been using **NixOS** for about a year now, and my feelings toward it are very mixed — I both love it and hate it.  

On the positive side, the declarative approach makes it incredibly easy to see exactly what the system is composed of. Everything is stored in configuration, which means I always have a backup of my setup. If an update breaks something, I can simply roll back and deal with the issue later. That level of reliability is hard to beat.  

But NixOS also comes with its fair share of quirks. Because so much of the system is built around symlinks, even small things can trip you up. Writing a quick Bash script, for example, requires a slightly different shebang than usual. It’s not a huge problem, but these little headaches tend to add up over time.  

The general rule with NixOS is: *you can do almost anything — it just takes some work.* The upside is that once something is set up, it usually stays rock solid, since nothing changes on the system unless you explicitly declare it.

---

## Distro Hopping
With those drawbacks in mind, I decided to take a break from NixOS and give **Arch Linux** a try. I wanted to see if the things I miss would feel different in a more traditional, dynamic system.  

So far, I’ve realized I really do miss the declarative approach of NixOS. Arch is great for flexibility and experimentation, but there’s something uniquely reassuring about having a system that won’t change under you without your say-so.  

Looking ahead, I’ve been considering setting up a **home server**, and with what I now know about Nix, I think it’s the perfect candidate. For something that needs to be stable and consistent over time, NixOS feels like the right tool for the job.

