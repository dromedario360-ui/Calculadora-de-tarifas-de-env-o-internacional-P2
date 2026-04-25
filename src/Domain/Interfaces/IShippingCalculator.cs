namespace ShippingCalculatorP2.Domain.Interfaces
{
    public interface ICalculadoraEnvio
    {
        double CalcularTarifa(double peso);
        string ObtenerNombrePais();
    }
}
