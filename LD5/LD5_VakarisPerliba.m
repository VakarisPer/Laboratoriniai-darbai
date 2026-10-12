% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-10-12

%% 1 uzduotis
% a)
studentas.vardas = 'Vakaris';
studentas.pavarde = 'Perliba';
studentas.grupe = 'EDIF-25/2';
studentas.pazymiai = [10 2 2 2; 2 10 2 2];

studentas

% b)
studentas(2).vardas = 'Jonas';
studentas(2).pavarde = 'Jonaitis';
studentas(2).grupe = 'EDIF-25/2';
studentas(2).pazymiai = [2 2 2 1; 2 2 2 4];

studentas(3).vardas = 'Ona';
studentas(3).pavarde = 'Onaityte';
studentas(3).grupe = 'EDIF-25/1';
studentas(3).pazymiai = [9 9 10 8; 10 9 9 10];

studentas

disp('Pries:')
disp(studentas(2).pazymiai)

studentas(2).pazymiai(1,4) = 10;

disp('Po:')
disp(studentas(2).pazymiai)

studentas = setfield(studentas, {3}, 'pazymiai', {2,1}, 7);
disp(studentas(3).pazymiai)

%% 2
palukanos = [0.10 0.15 0.20];
metai = 1;

format bank
disp('      Suma           Bankas1       Bankas2       Bankas3')
for suma = 10000:1000:20000
    imoka = suma * (1 + palukanos * metai) / (12 * metai);
    disp([suma imoka])
end
format short

%% Papildoma

x = input('X = ');
y = input('Y = ');

for i = 1:20
    m = ceil(x*rand);
    n = ceil(y*rand);
    A = zeros(x,y);
    A(m,n) = NaN;
    disp(A);
    pause(0.5);
    clc
end