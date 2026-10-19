% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-10-19

%% 1 uzduotis

help kelv2far

F = kelv2far(0)
F = kelv2far(273.15)
F = kelv2far(373.15)
F = kelv2far([0 100 273.15 300])

%% 2 uzduotis

clear
global x y

x = 2*pi:-0.1:-2*pi;
y = zeros(size(x));

y_nelygu0
y_lygu0

figure;
plot(x, y, '--y*');
title('y(x) = sin(x)/x, kai x \neq 0;  y(x) = 1, kai x = 0');
xlabel('x');
ylabel('y');
grid on;

whos
whos global

%% Papildoma

help specfunkc

R = specfunkc(3)

R = specfunkc(2, 3)

specfunkc(5)