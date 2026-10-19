function y_lygu0
%Y_LYGU0 Apskaiciuoja y = 1, kai x = 0.
%   Duomenys perduodami tik per globalius kintamuosius x ir y.

global x y

y(x == 0) = 1;
end
