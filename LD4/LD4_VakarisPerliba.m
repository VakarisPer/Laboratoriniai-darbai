% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-28


%% P1. Masyvo elementų indeksavimas

A = [0 1 0 2 3 0 4;
     0 0 0 0 0 0 0;
     0 5 0 6 7 0 8;
     0 9 0 1 2 0 3;
     0 0 0 0 0 0 0;
     0 4 0 5 6 0 7]

% B be eilučių ir stulpelių, sudarytų iš nulių
B = A(any(A ~= 0, 2), any(A ~= 0, 1))
