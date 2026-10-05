% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-28

%%--- a)

figure;
x = -2:0.1:1;
y = -2:0.1:1;

[X, Y] = meshgrid(x, y);
Z = 1 - 2*X.^2 - 3*Y.^2;

h = surf(X, Y, Z);

colormap gray;
shading interp;

rotate(h, [1 0 0], 78);
rotate(h, [0 1 0], 78);

title('f(x,y) = 1 - 2x^2 - 3y^2');
xlabel('x');
ylabel('y');
zlabel('z');
grid on;

%%--- b)

figure;

x = (2*rand(1,200)-1).*sqrt(pi/2);
y = (2*rand(1,200)-1).*sqrt(pi/2);

[X, Y] = meshgrid(x, y);
Z = sin(X.^2 + Y.^2);


h = surf(X, Y, Z);
colormap winter;
shading interp;

rotate(h, [1 0 0], 45);
rotate(h, [0 1 0], 45);

title('f(x,y) = sin(x^2 + y^2)');
xlabel('x');
ylabel('y');
zlabel('z');
grid on;

%%-- Papildoma

% a)
x = -1:0.1:1;
y = -1:0.1:1;
[X, Y] = meshgrid(x, y);
Z = 1 - (X.^2 + Y.^2);

figure;
surf(X,Y,Z);
shading interp;
colormap jet;
camlight;
lighting gouraud;

title('camlight');
xlabel('x'); 
ylabel('y');
zlabel('z');
grid on;

% b)
figure;
surf(X, Y, Z);
shading interp;
colormap jet;
hold on;
contour(X, Y, Z, 20, 'k');
hold off;

title('contour');
xlabel('x'); 
ylabel('y');
zlabel('z');
grid on;


% c)
figure;
surf(X, Y, Z);
title('simple surf');
xlabel('x'); 
ylabel('y');
zlabel('z');
grid on;
