function F = kelv2far(K)
%KELV2FAR Temperaturos keitimas is Kelvino i Farenheito skale.
%   F = KELV2FAR(K) grazina temperatura F laipsniais pagal Farenheita,
%   kai K - temperatura laipsniais pagal Kelvina.
%
%   Formule: F = K * 9/5 - 459.67
%
%   K gali buti skaicius, vektorius arba matrica.
%
%   Pavyzdys:
%       F = kelv2far(273.15)   % F = 32

F = K * 9/5 - 459.67;
end
