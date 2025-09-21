::freeimage
![Enkel](/projects/enkel_logo.png)  
::

# Building My Own Programming Language: Enkel

Over the past semester, I’ve been working on something I’ve always wanted to try: designing and building my own programming language, **Enkel**. Inspired by spoken Norwegian, Enkel is meant to feel natural and intuitive, while still being a fully functioning language with its own interpreter.
<!--more-->

->[Github Link](https://github.com/pettertesdal/EnkelLanguage)
---

## Language Design

Enkel is structured as a line-based language, where each statement ends with a newline (or a return). At its core, it supports:

* **Assignments** with `=` and the keyword `ny` for updates
* **Conditionals** with `hvis`, `ellers hvis`, and `ellers så`
* **Functions** defined with `definer`
* **Loops** controlled by conditions or `stop`
* **Printing** using `skriv`
* **Return statements** with `return`

It also has built-in error handling and comments using `#`.

Example:

```enkel
hvis a == 3 så
  skriv "a == 3"
slutt ellers hvis a == 4 så
  skriv "a == 4"
slutt ellers
  skriv "a er noe annet enn 3 og 4"
slutt
```

Recursive functions are also possible:

```enkel
definer tall fibonacci med tall a:
  hvis a <= 1 så
    return a.
  slutt
  b = gjør fibonacci med (a - 1)
  c = gjør fibonacci med (a - 2)
  return b + c.
slutt

skriv gjør fibonacci med les tall
```

---

## Under the Hood

Enkel is built in **Java**, using **ANTLR4** for the lexer and parser, and integrates with **LLVM** (through JavaCPP bindings) for compilation attempts.

* **ANTLR**: Designing the grammar was challenging but rewarding. I initially tried indentation-based blocks (like Python), but ended up using explicit tokens (`:`, `så`, `slutt`) for clarity. IntelliJ’s ANTLR plugin was especially helpful for debugging grammar.
* **Interpreter**: The interpreter converts parse trees into a Java-based AST structure using a visitor pattern. A `StatementProcessor` and `ExpressionProcessor` handle execution, with scoping handled neatly through symbol tables. I also built a REPL environment that supports multi-line input and nested scopes.
* **LLVM**: This was the hardest part. While I got the structure set up, I couldn’t get even simple programs to compile fully in time. The JavaCPP bindings were tricky and poorly documented, but the experience gave me a deeper understanding of LLVM.

---

## Setup & Usage

The project is Maven-based:

```bash
mvn clean compile   # generates lexer & parser
mvn clean package   # builds an executable JAR
```

Running without input starts a REPL. Running with a file executes it, and adding `--build` attempts compilation (still a work in progress).

---

## Reflections

Building Enkel taught me a lot:

* Writing a grammar in ANTLR forced me to think deeply about language structure.
* Implementing an interpreter in Java gave me more appreciation for scoping, type-checking, and execution flows.
* Attempting LLVM integration showed me just how complex compiler toolchains can be, especially across languages.

While not everything worked out (LLVM in particular), I’m proud of how far the project has come. I now have a working interpreter, a REPL, and a language that feels close to home—literally, since it’s based on Norwegian.

---

## Conclusion

Enkel may not be a production-ready language, but it’s been a fantastic experiment. It blends natural language with programming constructs, and building it gave me hands-on experience with **parsing, interpreters, scoping, and compiler design**.

I plan to keep exploring LLVM integration in the future, but for now, I’m happy to say: **Enkel works!**

---

Would you like me to make this more **casual and storytelling-like** (like a dev blogpost with anecdotes), or keep it **structured and technical** like above?

