using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearningCenter.Repository.DataRepository;
using System.Linq.Expressions;

namespace LearningCenter.Test.Repository
{
  public  class DataRepositoryTest<T> : IDataRepository<T> where T : class
    {
        #region "Private Member(s)"

        private List<T> _dbSet;

        #endregion

        #region "Constructor"

        /// <summary>
        /// Public Constructor
        /// </summary>
        public DataRepositoryTest()
        {
            this._dbSet = Database.GetAll<T>() as List<T>;
        }

        #endregion

        #region "Public properties"

        /// <summary>
        /// Property fetches the total Count from the dbset.
        /// </summary>
        public int TotalCount
        {
            get { return _dbSet.Count(); }
        }

        #endregion

        #region "Public Method(s)"

        /// <summary>
        /// Method add the entity into the context.
        /// </summary>
        /// <param name="entity"></param>
        public T Add(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        /// <summary>
        /// Method attaches the entity from the context
        /// </summary>
        /// <param name="entity"></param>
        public void Attach(T entity)
        {
        }

        /// <summary>
        /// Method call when explicitly updating the enteries.
        /// </summary>
        /// <param name="entity"></param>
        public void Update(T entity)
        {
            var index = _dbSet.IndexOf(entity);
            _dbSet[index] = entity;
        }

        /// <summary>
        /// Method fetches the IQueryable based on the filter,orderby and properties to inculde.
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="orderBy"></param>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        public IQueryable<T> Fetch(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            IQueryable<T> query = _dbSet.AsQueryable();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (!String.IsNullOrWhiteSpace(includeProperties))
            {
                //query = includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Aggregate(
                //query, (current, includeProperty) => current.Include(includeProperty));
            }

            return orderBy != null ? orderBy(query).AsQueryable() : query.AsQueryable();
        }

        /// <summary>
        /// Method fetches the IQueryable based on expression.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public IQueryable<T> Fetch(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsQueryable().Where(predicate);
        }

        /// <summary>
        /// Method fetches the IQueryable based on filter,size and index.
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="total"></param>
        /// <param name="index"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public IQueryable<T> Fetch(Expression<Func<T, bool>> filter, out int total, int index = 0, int size = 50)
        {
            total = 0;
            var skipCount = index * size;
            var resetSet = filter != null ? _dbSet.AsQueryable().Where(filter).AsQueryable() : _dbSet.AsQueryable();
            resetSet = skipCount == 0 ? resetSet.Take(size) : resetSet.Skip(skipCount).Take(size);
            total = resetSet.Count();
            return resetSet.AsQueryable();
        }

        /// <summary>
        /// Method fetches the set of record based on the supplied fucntion.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public IQueryable<T> Fetch(Func<T, bool> predicate)
        {
            return _dbSet.Where<T>(predicate).AsQueryable();
        }

        /// <summary>
        /// Method fetches the entity based on the keys supplied.
        /// </summary>
        /// <param name="keys"></param>
        /// <returns></returns>
        public T Find(params object[] keys)
        {
            
            throw new NotImplementedException();
        }

        /// <summary>
        /// Method fetches the entity by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public T GetById(object id)
        {
            return _dbSet.AsQueryable().FirstOrDefault();
        }

        /// <summary>
        /// Method fetches the first or default item from the datacontext based on the the supplied function.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsQueryable().FirstOrDefault(predicate);
        }

        /// <summary>
        /// Method fetches the first record based on the supplied function.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T First(Func<T, bool> predicate)
        {
            return _dbSet.First<T>(predicate);
        }

        /// <summary>
        /// Method Fetches the particular single record based on the supplied function.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T Single(Func<T, bool> predicate)
        {
            return _dbSet.Single<T>(predicate);
        }

        /// <summary>
        /// Method Fetches all the data before executing query.
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> GetAll()
        {
            return _dbSet.AsQueryable();
        }

        /// <summary>
        /// Method Checks whether dbset has anything entity in it or not.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public bool Contains(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsQueryable().Any(predicate);
        }

        /// <summary>
        /// Method save the changes into the context
        /// </summary>
        public void SaveChanges()
        {

        }

        /// <summary>
        /// Method deletes the entity from the datacontext by Id
        /// </summary>
        /// <param name="id"></param>
        public void Delete(object id)
        {
            

        }

        /// <summary>
        /// Method deletes the entity from the datacontext.
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        /// <summary>
        /// Method deletes the entity based on the supplied function.
        /// </summary>
        /// <param name="predicate"></param>
        public void Delete(Expression<Func<T, bool>> predicate)
        {
            var entitiesToDelete = Fetch(predicate);
            foreach (var entity in entitiesToDelete)
            {
                _dbSet.Remove(entity);
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
