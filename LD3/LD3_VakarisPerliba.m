% Vardas: Vakaris
% Pavarde: Perliba
% Grupe: EDIF-25/2
% Data: 2026-09-28

%% 1. Dvimatis grafikų vaizdavimas

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



%% 2. Specializuotų grafikų kūrimas


% a)

A = 

