% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-21


%% 1. Vienmačiai masyvai

% a) vektorius-eilutė: pradinė /2 - pi, galutinė 3*pi, žingsnis 0.5

a = (-pi/2) : 0.5 : (3*pi);

% b) narių kvadratas

b = a.^2;

% c) trečias vektorius: sin(a + b)

c = sin(a + b);

% d) atsakymas vektoriumi-stulpeliu

c = c(:);

%% 2. Dvimačiai masyvai

% a) matrica Z iš 9 narių (rand)

A = rand(3)
Z = floor(1 + 10 * A)

% b) pašalinti antrąjį stulpelį

Z(:, 2)=[]

% c) transponuoti

Z_t = Z'


%% 3. Praktinis veiksmų su masyvais taikymas

A = 4;
f = 3;
sigma = 1;
U1 = 2.5;
U2 = 1.5;
t = 0 : 0.002 : 1.5;

s = A * sin(2 * pi * f * t);
n = sigma * randn(size(t))

s_all = s + n;

% a) atrinkti reikšmes > U1
s_selected = s_all(s_all > U1);

% b) filtravimas: |reikšmė| < U2 -> 0

s_filtered = a_all;
s_filtered(abs(s_filtered) < U2) = 0;

% c) nefiltruoto signalo dydis

s_all_size = length(s_all);

% d) a) dalies atrinktų reikšmių dydis

s_filtered_size = length(s_filtered);

% e) filtruoto signalo max ir min
s_max_value = max(s_filtruotas);
s_min_value = min(s_filtruotas);



%% Papildoma užduotis

% 1. Paprašome įvesti vektorių A
A = input('Iveskite 10 elementu vektoriu A: ');

% 2. Sukuriame vektorių B pagal nurodytą tvarką
B = [A(end:-1:6), A(1:5)];

% 3. Išvedame rezultatą komandiniame lange
disp('vektorius B yra:');
disp(B);