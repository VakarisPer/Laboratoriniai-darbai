% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-21


%% 1. Vienmačiai masyvai

% a) vektorius-eilutė: pradinė /2 - pi, galutinė 3*pi, žingsnis 0.5

% b) narių kvadratas

% c) trečias vektorius: sin(a + b)

% d) atsakymas vektoriumi-stulpeliu


%% 2. Dvimačiai masyvai

% a) matrica Z iš 9 narių (rand)

% b) pašalinti antrąjį stulpelį

% c) transponuoti


%% 3. Praktinis veiksmų su masyvais taikymas

A = 4;      % V
f = 3;      % Hz
sigma = 1;  % V
U1 = 2.5;   % V
U2 = 1.5;   % V
t = 0 : 0.002 : 1.5;

% s(t) = A * sin(2*pi*f*t)
% n = sigma * randn(size(t))

% a) atrinkti reikšmes > U1

% b) filtravimas: |reikšmė| < U2 -> 0

% c) nefiltruoto signalo dydis

% d) a) dalies atrinktų reikšmių dydis

% e) filtruoto signalo max ir min
