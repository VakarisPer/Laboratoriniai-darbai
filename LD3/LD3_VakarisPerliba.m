% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-28

%% 1

% a)

x = 0:0.1:2*pi;

y = x.^3 + tan(x)


figure
plot(x,y, "bo");


xlabel('X ašis');
ylabel('Y ašis');

title(' f(x) = x^3 + tan(x) ');
legend(' f(x) = x^3 + tan(x) ')

axis([min(x) max(x) min(y) max(y)])
grid on;


% b)

y1 = exp(x)
y2 = exp(3*x)
y3 = exp(5*x)


figure
plot(x, y1, 'b-o',  x, y2, "g", x, y3, "r");

xlabel('X ašis');
ylabel('Y ašis');

title(' y1 = e^x    y2 = e^{3x}  y3 = e^{5x} ');
legend('y1 = e^x', 'y2 = e^{3x}', 'y3 = e^{5x}');

axis([min(x) max(x) min([y1 y2 y3]) max([y1 y2 y3])]);
grid on;



%% 2


% a)

A = [10 8 2 1; 10 5 10 3; 10 2 10 1; 10 7 6 3; nan nan nan nan; nan nan nan nan]

figure
subplot(2,1,1)
bar(A);
xlabel('Studentas');
ylabel('p');
ylim([0 10]);
legend('1 egz', '2 egz', '3 egz', '4 egz');
title('a)');
grid on;

% b) diskretus formatas

subplot(2,1,2)
stem(A);
xlabel('Studentas');
ylabel('p');
ylim([0 10]);
title('b)');
grid on;


%% Papildoma

% P1)

A = [0 1 0 2 3 0 4;
     0 0 0 0 0 0 0;
     0 5 0 6 7 0 8;
     0 9 0 1 2 0 3;
     0 0 0 0 0 0 0;
     0 4 0 5 6 0 7]

B = A(any(A ~= 0, 2), any(A ~= 0, 1))


