% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-15

x = 1:32
y = x.^2;

plot(x,y, 'o-r', x, y/3, 'xb')
title('Dvi funkcijos')
xlabel('X-ai')
ylabel('F_1 [-o-]  |  F_2 [-x-]')


%% Papildoma užduotis

N = 2;

A_vect = N + 1 : 0.5 : N + 4

A = reshape(N:N+8, 3, 3);


pic_a = A(3, 2)
pic_b = A(2:3, 1:2)
pic_c = A([1,end], [1,end])


modified_vect = [A_vect, 6, 7];

to_matric_vect = reshape(modified_vect, 3, 3)

A_new = [A, to_matric_vect]