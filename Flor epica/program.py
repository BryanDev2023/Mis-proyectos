import turtle as t
import random as ra

wn = t.Screen()
wn.bgcolor("black")
wn.setup(width=800, height=500)

x = 0
j = t.Turtle()

j.speed(0)
j.color("white")
j.hideturtle()

r = None
g = None
b = None


while x < 100:
    r = ra.randint(0, 255)
    g = ra.randint(0, 255)
    b = ra.randint(0, 255)
    
    wn.colormode(255)
    j.circle(50 + x)
    j.right(45)

    x += 1

wn.mainloop()
