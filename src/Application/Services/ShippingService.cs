using ShippingCalculatorP2.Domain.Interfaces;
using ShippingCalculatorP2.Domain.Models;
using ShippingCalculatorP2.Infrastructure;

namespace ShippingCalculatorP2.Application.Services
{
    public class ServicioEnvio
    {
        private readonly FabricaCalculadora _fabrica;

        public ServicioEnvio()
        {
            _fabrica = new FabricaCalculadora();
        }

        public ResultadoEnvio CalcularEnvio(double peso, string pais)
        {
            ICalculadoraEnvio calculadora = _fabrica.Crear(pais);

            if (calculadora == null)
                return null;

            double costo = calculadora.CalcularTarifa(peso);

            ResultadoEnvio resultado = new ResultadoEnvio();
            resultado.Pais = calculadora.ObtenerNombrePais();
            resultado.Peso = peso;
            resultado.TarifaPorKg = costo / peso;
            resultado.CostoTotal = costo;

            return resultado;
        }
    }
}
