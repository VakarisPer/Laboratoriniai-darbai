function varargout = specfunkc(varargin)
%SPECFUNKC Funkcija, kurios veikimas priklauso nuo argumentu skaiciaus.
%   R = SPECFUNKC(A)    grazina A pakelta kvadratu (A^2).
%   R = SPECFUNKC(A, B) A pakelia kvadratu, B - kubu ir grazina ju
%                       suma (A^2 + B^3).
%
%   Pavyzdys:
%       specfunkc(3)      % 9
%       specfunkc(2, 3)   % 4 + 27 = 31

if nargin == 1
    a = varargin{1};
    rez = a.^2;
elseif nargin == 2
    a = varargin{1};
    b = varargin{2};
    rez = a.^2 + b.^3;
else
    error('Funkcijai reikia duoti 1 arba 2 kintamuosius (duota %d).', nargin);
end

if nargout > 1
    error('Funkcija grazina tik viena kintamaji.');
end

varargout{1} = rez;
end
