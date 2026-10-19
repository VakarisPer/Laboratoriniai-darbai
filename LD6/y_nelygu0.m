function y_nelygu0
%Y_NELYGU0 Apskaiciuoja y = sin(x)/x, kai x ~= 0.
%   Duomenys perduodami tik per globalius kintamuosius x ir y.

global x y

k = (x ~= 0);
y(k) = sin(x(k)) ./ x(k);
end
